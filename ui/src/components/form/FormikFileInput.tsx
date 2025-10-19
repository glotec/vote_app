// components/FormikFileInput.tsx
import React from "react";
import { useField, useFormikContext } from "formik";

type FormikFileInputProps = {
    name: string;
    label: string;
};

const FormikFileInput: React.FC<FormikFileInputProps> = ({ name, label }) => {
    const [field, meta] = useField(name);
    const { setFieldValue } = useFormikContext();

    return (
        <div className="mb-4">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <input
                id={name}
                name={name}
                type="file"
                onChange={(event) => {
                    const file = event.currentTarget.files?.[0];
                    setFieldValue(name, file); // this is the key part
                }}
                className="w-full border p-2 rounded-md text-neutral file-input-xs"
            />
            {meta.touched && meta.error && (
                <div className="text-red-500 text-sm mt-1">{meta.error}</div>
            )}
        </div>
    );
};

export default FormikFileInput;
