function ErrorState({ message, onRetry }) {

    return (
        <div>

            <p>
                {message}
            </p>

            <button onClick={onRetry}>
                Retry
            </button>

        </div>
    );
}

export default ErrorState;