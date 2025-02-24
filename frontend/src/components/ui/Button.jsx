function Button(props) {
    const {
        children,
        variant = "bg-black",
        onClick = () => {},
        type = "button",
    } = props;
    return (
        <>
            <button
                className={`${variant}  h-10 px-6  font-semibold rounded-md text-white`}
                onClick={onClick}
            >
                {children}
            </button>
        </>
    );
}

export default Button;
