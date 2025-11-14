import dotenv from "dotenv";
dotenv.config();

const BASE_URL = "http://localhost:3000";

async function testEndpoints() {
  console.log("🧪 Testing Authentication Endpoints\n");

  // Test 1: Register with valid data
  console.log("1️⃣ Testing REGISTER with valid data...");
  try {
    const registerRes = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: `test${Date.now()}@example.com`,
        password: "Password@123"
      })
    });
    const registerData = await registerRes.json();
    console.log(`   Status: ${registerRes.status}`);
    console.log(`   Response:`, registerData);
    
    if (registerRes.status === 201 && registerData.token) {
      console.log("   ✅ PASS\n");
      
      // Test 2: Login with same credentials
      console.log("2️⃣ Testing LOGIN with registered user...");
      const loginRes = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: registerData.email || `test${Date.now()}@example.com`,
          password: "Password@123"
        })
      });
      const loginData = await loginRes.json();
      console.log(`   Status: ${loginRes.status}`);
      console.log(`   Response:`, loginData);
      console.log(loginRes.status === 200 && loginData.token ? "   ✅ PASS\n" : "   ❌ FAIL\n");
      
      // Test 3: Access protected route
      console.log("3️⃣ Testing PROTECTED route with token...");
      const profileRes = await fetch(`${BASE_URL}/api/users/profile`, {
        headers: { "Authorization": `Bearer ${registerData.token}` }
      });
      const profileData = await profileRes.json();
      console.log(`   Status: ${profileRes.status}`);
      console.log(`   Response:`, profileData);
      console.log(profileRes.status === 200 ? "   ✅ PASS\n" : "   ❌ FAIL\n");
    } else {
      console.log("   ❌ FAIL\n");
    }
  } catch (err: any) {
    console.log(`   ❌ ERROR: ${err.message}\n`);
  }

  // Test 4: Register with missing password
  console.log("4️⃣ Testing REGISTER with missing password...");
  try {
    const res = await fetch(`${BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "test@example.com" })
    });
    const data = await res.json();
    console.log(`   Status: ${res.status}`);
    console.log(`   Response:`, data);
    console.log(res.status === 400 ? "   ✅ PASS\n" : "   ❌ FAIL\n");
  } catch (err: any) {
    console.log(`   ❌ ERROR: ${err.message}\n`);
  }

  // Test 5: Login with wrong password
  console.log("5️⃣ Testing LOGIN with wrong password...");
  try {
    const res = await fetch(`${BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "WrongPassword"
      })
    });
    const data = await res.json();
    console.log(`   Status: ${res.status}`);
    console.log(`   Response:`, data);
    console.log(res.status === 401 ? "   ✅ PASS\n" : "   ❌ FAIL\n");
  } catch (err: any) {
    console.log(`   ❌ ERROR: ${err.message}\n`);
  }

  // Test 6: Protected route without token
  console.log("6️⃣ Testing PROTECTED route without token...");
  try {
    const res = await fetch(`${BASE_URL}/api/users/profile`);
    const data = await res.json();
    console.log(`   Status: ${res.status}`);
    console.log(`   Response:`, data);
    console.log(res.status === 401 ? "   ✅ PASS\n" : "   ❌ FAIL\n");
  } catch (err: any) {
    console.log(`   ❌ ERROR: ${err.message}\n`);
  }
}

testEndpoints();
