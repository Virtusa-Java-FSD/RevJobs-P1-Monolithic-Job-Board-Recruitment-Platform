export default function Profile() {
    return (
        <div style={styles.container}>
            {/* LEFT COLUMN */}
            <div style={styles.leftColumn}>
                <h2>Personal Info</h2>

                <div style={styles.field}>
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter your name" />
                </div>

                <div style={styles.field}>
                    <label>Email</label>
                    <input type="email" placeholder="example@gmail.com" />
                </div>

                <div style={styles.field}>
                    <label>Phone Number</label>
                    <input type="tel" placeholder="+91 XXXXX XXXXX" />
                </div>

                <div style={styles.field}>
                    <label>Location</label>
                    <input type="text" placeholder="City, State" />
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div style={styles.rightColumn}>
                <h2>Professional Info</h2>

                <div style={styles.field}>
                    <label>Skills</label>
                    <textarea placeholder="React, Java, SQL..." />
                </div>

                <div style={styles.field}>
                    <label>Experience</label>
                    <textarea placeholder="Describe your work experience..." />
                </div>

                <div style={styles.field}>
                    <label>Resume Upload</label>
                    <input type="file" />
                </div>

                <button style={styles.saveBtn}>Save Changes</button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: "flex",
        gap: "30px",
        padding: "20px",
        flexWrap: "wrap" as const,
    },
    leftColumn: {
        flex: 1,
        minWidth: "300px",
        background: "#1e1e1e",
        padding: "20px",
        borderRadius: "10px",
    },
    rightColumn: {
        flex: 2,
        minWidth: "300px",
        background: "#1e1e1e",
        padding: "20px",
        borderRadius: "10px",
    },
    field: {
        display: "flex",
        flexDirection: "column" as const,
        marginBottom: "15px",
    },
    saveBtn: {
        marginTop: "20px",
        padding: "10px 20px",
        background: "#4CAF50",
        border: "none",
        borderRadius: "5px",
        color: "white",
        cursor: "pointer",
    },
};
