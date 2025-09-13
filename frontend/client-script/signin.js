document.getElementById('login').addEventListener('submit',function(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const pass = document.getElementById('pass').value;

    fetch('../../backend/signin.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `email=${encodeURIComponent(email)}&password=${encodeURIComponent(pass)}`
    })
    .then(response => response.text())
    .then(data => {
        if(data.trim() == "สำเร็จแล้ว"){
            window.location.href = "../Public/index.html"
        }else{
            alert(data);
        }
    })
    .catch(error => {
        alert("ผิดผลาด : " + error)
    })
    
})