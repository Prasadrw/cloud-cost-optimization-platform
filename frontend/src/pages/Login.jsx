import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const [serverError, setServerError] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

        setErrors((previousErrors) => ({
            ...previousErrors,
            [name]: ""
        }));
    };

    const validate = () => {

        const newErrors = {};

        if (!formData.email.trim()) {

            newErrors.email = "Email is required";

        } else if (!formData.email.includes("@")) {

            newErrors.email = "Enter a valid email";

        }

        if (!formData.password.trim()) {

            newErrors.password = "Password is required";

        } else if (formData.password.length < 6) {

            newErrors.password =
                "Password must be at least 6 characters";
        }

        return newErrors;
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setServerError("");

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;
        }

        setLoading(true);

        try {

            await loginUser(formData);

            navigate("/analytics");

        } catch (error) {

            console.error(error);

            setServerError(
                error.message || "Login failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div>

            <h1>
                Login
            </h1>

            <form onSubmit={handleSubmit}>

                {/* Email */}

                <div>

                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                    />

                    {errors.email && (
                        <p>
                            {errors.email}
                        </p>
                    )}

                </div>

                {/* Password */}

                <div>

                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                    />

                    {errors.password && (
                        <p>
                            {errors.password}
                        </p>
                    )}

                </div>

                {/* Server Error */}

                {serverError && (
                    <p>
                        {serverError}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Logging in..."
                        : "Login"
                    }
                </button>

            </form>

        </div>
    );
}

export default Login;