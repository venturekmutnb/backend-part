const pass = document.getElementById('pass');
const email = document.getElementById('email');

const regex = /^[A-Z][\w\d]{7,14}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

email.addEventListener('blur', function () {
  const userEmail = this.value;

  if (!emailRegex.test(userEmail)) {
    alert("email ไม่ตรง pattern");
  }
})

pass.addEventListener('blur', function () {
  const password = this.value;

  if (!regex.test(password)) {
    alert("password ไม่ตรง pattern");
  }
})

document.getElementById('register').addEventListener('submit', async function (event) {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const pass = document.getElementById('pass').value;
  const firm = document.getElementById('firmpass').value;

  console.log("pass:",pass,"firm", firm);

  if (!emailRegex.test(email)) {
    alert("email ยังไม่ถูกต้อง");
    return;
  }

  if (!regex.test(pass)) {
    alert("รหัสยังไม่ถูกต้อง");
    return;
  }

  if (pass !== firm) {
    alert("รหัสผ่านไม่ตรงกัน");
  }
  else {
    alert("สมัครบัญชีสำเร็จ");
  }
  try{
    const response = await fetch('../../backend/signup.php',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(pass)}&firmpass=${encodeURIComponent(firm)}`
    })
    const result = await response.text();
    alert(result);
  }catch(error){
    alert("เกิดข้อผิดพลาดในการสมัครสมาชิค")
  }
})
