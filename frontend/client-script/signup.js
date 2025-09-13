const pass = document.getElementById('pass');
const email = document.getElementById('email');

const regex = /^[A-Z][\w\d]{7,14}$/;

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

  if (!regex.test(pass)) {
    alert("รหัสยังไม่ถูกต้อง");
    return;
  }

  if (pass !== firm) {
    alert("รหัสผ่านไม่ตรงกัน");
  }
  console.log("ส่งข้อมูลไป PHP:", email, pass, firm);
  try{
    const response = await fetch('../../backend/signup.php',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `email=${encodeURIComponent(email)}&pass=${encodeURIComponent(pass)}&firmpass=${encodeURIComponent(firm)}`
    })
    const result = await response.text();
    if(response.ok && result.trim() === "สมัครสมาชิกสำเร็จ"){
      window.location.href = '../Public/signin.html';
      return;
    }
    alert(result);
  }catch(error){
    alert("เกิดข้อผิดพลาดในการสมัครสมาชิค")
  }
})