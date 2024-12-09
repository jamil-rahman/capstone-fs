import {
    Sun, // early bird
    Moon, // night owl
    Cigarette, // smokes
    Wine, // drinks
    Cat, // pets
    Sparkles, // very clean
    Users, // frequent guests
    UserMinus, // rarely/never guests
    Clock, // flexible sleep
    Droplets, // moderate clean
    Soup // dietary restrictions
} from 'lucide-react';

const TagWrapper = ({ icon: Icon, label, className = "" }) => (
    <div
        className={`d-flex align-items-center gap-1 justify-content-center badge-container ${className}`}
        title={label}
    >
        <Icon size={16} />
        <span className="badge-label">{label}</span>
    </div>
);

const UserPreferences = ({ preferences }) => {
    const { lifestyle, dietary } = preferences;

    return (
        <div className="d-flex flex-wrap gap-2 align-items-center">
            {/* Sleep Schedule */}
            {lifestyle.sleepSchedule === 'early-bird' && (
                <TagWrapper
                    icon={Sun}
                    label="Early Bird"
                    className="bg-warning text-white"
                />
            )}
            {lifestyle.sleepSchedule === 'night-owl' && (
                <TagWrapper
                    icon={Moon}
                    label="Night Owl"
                    className="bg-primary text-white"
                />
            )}
            {lifestyle.sleepSchedule === 'flexible' && (
                <TagWrapper
                    icon={Clock}
                    label="Flexible Schedule"
                    className="bg-white text-dark"
                />
            )}

            {/* Smoking & Drinking */}
            {lifestyle.smokes && (
                <TagWrapper
                    icon={Cigarette}
                    label="Smoker"
                    className="bg-danger text-white"
                />
            )}
            {lifestyle.drinks && (
                <TagWrapper
                    icon={Wine}
                    label="Drinks Alcohol"
                    className="bg-danger text-white"
                />
            )}

            {/* Pets */}
            {lifestyle.prefersPets && (
                <TagWrapper
                    icon={Cat}
                    label="Pet Friendly"
                    className="bg-success text-white"
                />
            )}

            {/* Cleanliness */}
            {lifestyle.cleanliness === 'very-clean' && (
                <TagWrapper
                    icon={Sparkles}
                    label="Very Clean"
                    className="bg-info text-white"
                />
            )}
            {lifestyle.cleanliness === 'moderate' && (
                <TagWrapper
                    icon={Droplets}
                    label="Moderately Clean"
                    className="bg-white text-dark"
                />
            )}

            {/* Guest Comfort */}
            {lifestyle.guestComfort === 'frequently' && (
                <TagWrapper
                    icon={Users}
                    label="Frequently Hosts Guests"
                    className="bg-primary text-white"
                />
            )}
            {['rarely', 'never'].includes(lifestyle.guestComfort) && (
                <TagWrapper
                    icon={UserMinus}
                    label="Prefers Few or No Guests"
                    className="bg-dark text-white"
                />
            )}

            {/* Dietary Restrictions */}
            {dietary && dietary.length > 0 && (
                <TagWrapper
                    icon={Soup}
                    label={`Dietary: ${dietary.join(', ')}`}
                    className="bg-warning text-white"
                />
            )}
        </div>
    );
};

export default UserPreferences;
