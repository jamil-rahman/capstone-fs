import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
    <div className="text-center py-4">
        <Spinner animation="border" variant="primary" />
    </div>
);

export default LoadingSpinner;