async function runTests() {
    try {
        console.log("1. Testing unauthorized CV PUT...");
        const res1 = await fetch('http://localhost:5000/api/cv', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        });
        console.log('   Status:', res1.status); // Expect 401

        console.log("\n2. Testing Admin Login...");
        const res2 = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: 'admin', password: 'password123' })
        });
        console.log('   Status:', res2.status); // Expect 200
        const data = await res2.json();
        const token = data.token;

        if (token) {
            console.log("\n3. Testing authorized CV PUT...");
            const res3 = await fetch('http://localhost:5000/api/cv', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ summary: "Testing JWT update" })
            });
            console.log('   Status:', res3.status); // Expect 200
        } else {
            console.log("Failed to get token.");
        }
    } catch (e) {
        console.error("Test failed:", e);
    }
}

runTests();
