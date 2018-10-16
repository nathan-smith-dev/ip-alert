module.exports = ip => {
    return `
    <html>
        <body>
            <div style="text-align: center;">
                <h3>IP Changed</h3>
                <p>New IP:</p>
                <p>${ip}</p>
            </div>
        </body>
    </html>
    `;
};
