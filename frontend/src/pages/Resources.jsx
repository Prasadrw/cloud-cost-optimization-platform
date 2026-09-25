import { useState } from "react";

import useResources from "../hooks/useResources";
import ResourceCard from "../components/ResourceCard";

function Resources() {

    const {
        resources,
        loading,
        error,
        addResource,
        updateResourceById,
        removeResource,
        fetchResources,
        pagination
    } = useResources();


    const [showForm, setShowForm] = useState(false);

    const [editingResource, setEditingResource] = useState(null);

    const [formError, setFormError] = useState("");


    const [formData, setFormData] = useState({
        provider: "AWS",
        service: "EC2",
        resourceType: "EC2",
        resourceId: "",
        name: "",
        region: "",
        status: "running",
        hourlyPrice: ""
    });


    // -----------------------------
    // Handle form input
    // -----------------------------

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previousData) => ({
            ...previousData,
            [name]: value
        }));

    };


    // -----------------------------
    // Reset form
    // -----------------------------

    const resetForm = () => {

        setFormData({
            provider: "AWS",
            service: "EC2",
            resourceType: "EC2",
            resourceId: "",
            name: "",
            region: "",
            status: "running",
            hourlyPrice: ""
        });

        setEditingResource(null);
        setFormError("");
        setShowForm(false);

    };


    // -----------------------------
    // Add button
    // -----------------------------

    const handleAdd = () => {

        setEditingResource(null);

        setFormData({
            provider: "AWS",
            service: "EC2",
            resourceType: "EC2",
            resourceId: "",
            name: "",
            region: "",
            status: "running",
            hourlyPrice: ""
        });

        setFormError("");
        setShowForm(true);

    };


    // -----------------------------
    // Edit resource
    // -----------------------------

    const handleEdit = (resource) => {

        setEditingResource(resource);

        setFormData({
            provider: resource.provider || "AWS",
            service: resource.service || "EC2",
            resourceType: resource.resourceType || "EC2",
            resourceId: resource.resourceId || "",
            name: resource.name || "",
            region: resource.region || "",
            status: resource.status || "running",
            hourlyPrice: resource.hourlyPrice ?? ""
        });

        setFormError("");
        setShowForm(true);

    };


    // -----------------------------
    // Delete resource
    // -----------------------------

    const handleDelete = async (resourceId) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this resource?"
        );

        if (!confirmed) {
            return;
        }

        try {

            await removeResource(resourceId);

            await fetchResources();

        } catch (error) {

            console.error(
                "Delete resource failed:",
                error
            );

        }

    };


    // -----------------------------
    // Submit form
    // -----------------------------

    const handleSubmit = async (event) => {

        event.preventDefault();

        setFormError("");


        // Validate hourly price

        const hourlyPrice = Number(
            formData.hourlyPrice
        );

        if (
            formData.hourlyPrice === "" ||
            Number.isNaN(hourlyPrice) ||
            hourlyPrice < 0
        ) {

            setFormError(
                "Please enter a valid hourly price."
            );

            return;
        }


        // Create the exact object
        // expected by backend

        const resourceData = {

            provider: formData.provider,

            service: formData.service,

            resourceType: formData.resourceType,

            resourceId: formData.resourceId.trim(),

            name: formData.name.trim(),

            region: formData.region.trim(),

            status: formData.status,

            hourlyPrice: hourlyPrice

        };


        // Basic validation

        if (!resourceData.service) {

            setFormError(
                "Service is required."
            );

            return;
        }


        if (!resourceData.resourceId) {

            setFormError(
                "Resource ID is required."
            );

            return;
        }


        if (!resourceData.name) {

            setFormError(
                "Resource name is required."
            );

            return;
        }


        if (!resourceData.region) {

            setFormError(
                "Region is required."
            );

            return;
        }


        console.log(
            "RESOURCE DATA BEING SENT:",
            resourceData
        );


        try {

            if (editingResource) {

                await updateResourceById(
                    editingResource._id,
                    resourceData
                );

            } else {

                await addResource(
                    resourceData
                );

            }


            resetForm();

            await fetchResources();

        } catch (error) {

            console.error(
                "Save resource failed:",
                error
            );

            setFormError(
                error.message ||
                "Failed to save resource."
            );

        }

    };


    // -----------------------------
    // Loading
    // -----------------------------

    if (loading) {

        return (
            <div>
                Loading resources...
            </div>
        );

    }


    // -----------------------------
    // UI
    // -----------------------------

    return (

        <div>

            <h1>
                Cloud Resources
            </h1>


            {error && (

                <div>

                    <p>
                        Error: {error}
                    </p>

                </div>

            )}


            <button
                type="button"
                onClick={handleAdd}
            >
                Add Resource
            </button>


            {/* =========================
                RESOURCE FORM
            ========================== */}

            {showForm && (

                <div>

                    <h2>
                        {editingResource
                            ? "Edit Resource"
                            : "Add Resource"
                        }
                    </h2>


                    {formError && (

                        <p>
                            Error: {formError}
                        </p>

                    )}


                    <form
                        onSubmit={handleSubmit}
                    >


                        {/* Provider */}

                        <div>

                            <label>
                                Provider
                            </label>

                            <select
                                name="provider"
                                value={formData.provider}
                                onChange={handleChange}
                            >

                                <option value="AWS">
                                    AWS
                                </option>

                            </select>

                        </div>


                        {/* Service */}

                        <div>

                            <label>
                                Service
                            </label>

                            <select
                                name="service"
                                value={formData.service}
                                onChange={handleChange}
                            >

                                <option value="EC2">
                                    EC2
                                </option>

                                <option value="S3">
                                    S3
                                </option>

                                <option value="RDS">
                                    RDS
                                </option>

                                <option value="Lambda">
                                    Lambda
                                </option>

                            </select>

                        </div>


                        {/* Resource Type */}

                        <div>

                            <label>
                                Resource Type
                            </label>

                            <select
                                name="resourceType"
                                value={formData.resourceType}
                                onChange={handleChange}
                            >

                                <option value="EC2">
                                    EC2
                                </option>

                                <option value="S3">
                                    S3
                                </option>

                                <option value="RDS">
                                    RDS
                                </option>

                                <option value="Lambda">
                                    Lambda
                                </option>

                            </select>

                        </div>


                        {/* Resource ID */}

                        <div>

                            <label>
                                Resource ID
                            </label>

                            <input
                                type="text"
                                name="resourceId"
                                value={formData.resourceId}
                                onChange={handleChange}
                                placeholder="EC2-001"
                                required
                            />

                        </div>


                        {/* Resource Name */}

                        <div>

                            <label>
                                Resource Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Production Server"
                                required
                            />

                        </div>


                        {/* Region */}

                        <div>

                            <label>
                                Region
                            </label>

                            <input
                                type="text"
                                name="region"
                                value={formData.region}
                                onChange={handleChange}
                                placeholder="us-east-1"
                                required
                            />

                        </div>


                        {/* Status */}

                        <div>

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                            >

                                <option value="running">
                                    Running
                                </option>

                                <option value="stopped">
                                    Stopped
                                </option>

                                <option value="active">
                                    Active
                                </option>

                                <option value="inactive">
                                    Inactive
                                </option>

                            </select>

                        </div>


                        {/* Hourly Price */}

                        <div>

                            <label>
                                Hourly Price
                            </label>

                            <input
                                type="number"
                                name="hourlyPrice"
                                value={formData.hourlyPrice}
                                onChange={handleChange}
                                min="0"
                                step="0.0001"
                                placeholder="0.05"
                                required
                            />

                        </div>


                        {/* Buttons */}

                        <button
                            type="submit"
                        >
                            {editingResource
                                ? "Update Resource"
                                : "Create Resource"
                            }
                        </button>


                        <button
                            type="button"
                            onClick={resetForm}
                        >
                            Cancel
                        </button>


                    </form>

                </div>

            )}


            {/* =========================
                EXISTING RESOURCES
            ========================== */}

            <h2>
                Existing Resources
            </h2>


            {resources.length === 0 ? (

                <p>
                    No resources available.
                </p>

            ) : (

                <div>

                    {resources.map((resource) => (

                        <ResourceCard
                            key={resource._id}
                            resource={resource}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />

                    ))}

                </div>

            )}


            {/* =========================
                PAGINATION
            ========================== */}

            {pagination.totalPages > 1 && (

                <div>

                    <button
                        type="button"
                        disabled={
                            pagination.page <= 1
                        }
                        onClick={() =>
                            fetchResources({
                                page:
                                    pagination.page - 1,
                                limit:
                                    pagination.limit
                            })
                        }
                    >
                        Previous
                    </button>


                    <span>
                        {" "}
                        Page {pagination.page} of{" "}
                        {pagination.totalPages}{" "}
                    </span>


                    <button
                        type="button"
                        disabled={
                            pagination.page >=
                            pagination.totalPages
                        }
                        onClick={() =>
                            fetchResources({
                                page:
                                    pagination.page + 1,
                                limit:
                                    pagination.limit
                            })
                        }
                    >
                        Next
                    </button>

                </div>

            )}

        </div>

    );

}


export default Resources;