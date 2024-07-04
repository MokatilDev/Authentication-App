type ValidateInputProps = {
    labelName: string;
    inputName: string;
    inputType: string;
    placeholder: string;
    onChangeFn?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    error: string | undefined;
};

function ValidateInput({ labelName, inputName, inputType, placeholder, inputRef, error }: ValidateInputProps) {

    return (
        <>
            <label className="block text-sm mb-2 mt-2">{labelName}</label>
            <input
                defaultValue={""}
                type={inputType}
                name={inputName}
                placeholder={placeholder}
                ref={inputRef}
                className={
                    (error
                        ? "focus:outline-none focus:ring-4 focus:ring-red-500/30 border-red-500 "
                        : "border-blackInput focus:border-amber-300 focus:ring-4 focus:ring-amber-300/20 ") +
                    "text-white bg-input transition-all duration-150 rounded border p-2 px-2 text-base w-full placeholder:text-blackInput"
                }
            />
        </>
    );
}

export default ValidateInput;
