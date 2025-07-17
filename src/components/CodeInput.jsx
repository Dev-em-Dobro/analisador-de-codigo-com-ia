const CodeInput = ({ code, setCode }) => {
    return (
        <div className="input-group">
            <textarea
                className="code-textarea"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Cole seu código aqui (JavaScript, HTML, CSS)..."
            />
        </div>
    );
}

export default CodeInput