// controllers/cityInsightsController.js
const OpenAI = require('openai');
const { User } = require('../models/User');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

// Helper function to construct the prompt based on user preferences
const constructPrompt = (city, province, user, additional) => {

    return `
        I need detailed information about living in ${city}, ${province}, Canada for someone with the following preferences:
        
        Personal Profile:
        - Budget Range: $${user.budget.min} - $${user.budget.max}
        - Current Occupation: ${user.occupation || 'Not specified'}
        - Lifestyle: ${user.smokes ? 'Smoker' : 'Non-smoker'}, ${user.drinks ? 'Drinks alcohol' : 'Non-drinker'}
        - Dietary Restrictions: ${user.dietaryRestrictions.length > 0 ? user.dietaryRestrictions.join(', ') : 'None'}
        - Pet Preferences: ${user.prefersPets ? 'Pet-friendly environment preferred' : 'No pets preferred'}
        - Cleanliness Level: ${user.cleanliness}
        - Sleep Schedule: ${user.sleepSchedule}
        - Guest Comfort: Comfortable having guests ${user.guestComfort}
        
        Please provide a comprehensive analysis in the following structured format:

        1. Housing & Rent:
        - Average rent for different types of accommodations
        - Best neighborhoods based on the budget
        - Typical utility costs
        
        2. Cost of Living:
        - Monthly grocery expenses
        - Transportation costs
        - Entertainment expenses
        - Average restaurant prices
        
        3. Transportation:
        - Public transit options
        - Walkability score
        - Cycling infrastructure
        - Parking situation
        
        4. Lifestyle & Entertainment:
        - Popular areas for dining and nightlife
        - Cultural attractions
        - Outdoor activities
        - Fitness and recreation
        
        5. Employment Opportunities:
        - Major employers in ${user.occupation || 'various'} field(s)
        - Growing industries
        - Average salaries
        - Job market outlook
        
        6. Safety & Considerations:
        - Safe neighborhoods
        - Areas to avoid
        - Common concerns
        - Weather considerations
        
        7. Special Considerations (based on user preferences and input):
        ${user.dietaryRestrictions.length > 0 ? '- Restaurants catering to dietary restrictions' : ''}
        ${user.prefersPets ? '- Pet-friendly areas and services' : ''}
        ${user.sleepSchedule === 'night-owl' ? '- Late-night venues and services' : ''}
        ${user.guestComfort !== 'never' ? '- Social gathering spaces and entertainment venues' : ''}
        Provide more information based on available ${additional || 'none'} considerations or preferences 

    `.trim();
};

const parseResponse = (rawResponse) => {
    console.log('Starting to parse raw response');

    const sections = {};
    let currentSection = null;
    let currentContent = [];

    const lines = rawResponse.split('\n');

    for (const line of lines) {
        const sectionMatch = line.match(/^\d\.\s+([\w\s&]+):/);

        if (sectionMatch) {
            if (currentSection) {
                sections[currentSection.key] = {
                    title: currentSection.title,
                    content: currentContent.filter(item => item.length > 0)
                };
            }

            const sectionTitle = sectionMatch[1].trim();
            currentSection = {
                key: sectionTitle.toLowerCase().replace(/[&\s]+/g, '_'),
                title: sectionTitle
            };
            currentContent = [];
        } else if (line.trim().startsWith('-')) {
            const content = line.replace(/^-\s*/, '').trim();
            if (content && currentSection) {
                currentContent.push(content);
            }
        }
    }

    if (currentSection) {
        sections[currentSection.key] = {
            title: currentSection.title,
            content: currentContent.filter(item => item.length > 0)
        };
    }

    return sections;
};

const getOpenAIResponse = async (prompt) => {
    console.log('Requesting OpenAI completion');

    const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                "role": "system",
                "content": "You are a knowledgeable local expert providing detailed city insights. Focus on practical, accurate information formatted in a structured way."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature: 0.7,
        max_tokens: 2000
    });

    return completion.choices[0].message.content;
};

// Main controller function
const getCityInsights = async (req, res) => {
    try {
        const { city, province, additional } = req.body;
        const userId = req.user.uid;

        // Input validation
        if (!city || !province) {
            return res.status(400).json({
                success: false,
                message: 'City and province are required'
            });
        }

        // Get user preferences
        let user;
        try {
            user = await User.findOne({ firebaseUid: userId });
            console.log('Fetched user:', user);
        } catch (dbError) {
            console.error('Database error:', dbError);
            return res.status(500).json({
                success: false,
                message: 'Database error while fetching user',
                error: dbError.message
            });
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Construct prompt and get OpenAI response
        const prompt = constructPrompt(city, province, user, additional);
        const rawResponse = await getOpenAIResponse(prompt);
        const parsedSections = parseResponse(rawResponse);

        // Construct final response
        const response = {
            success: true,
            city,
            province,
            lastUpdated: new Date(),
            insights: {
                overview: {
                    city,
                    province,
                    budgetRange: `$${user.budget.min} - $${user.budget.max}`,
                },
                sections: parsedSections
            }
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('City insights error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get city insights',
            error: error.message
        });
    }
};

module.exports = {
    getCityInsights
};