document.addEventListener('DOMContentLoaded', async () => {
    // ===== Elements =====
    const form = document.getElementById('profileForm');
    const inputs = form.querySelectorAll('input');
    const btnEdit = document.getElementById('btnEdit');
    const actions = document.getElementById('editActions');
    const btnCancel = document.getElementById('btnCancel');
    const btnVerifyEmail = document.getElementById('btnVerifyEmail');

    function setEditing(on){
        inputs.forEach(el => el.disabled = !on);
        actions.style.display = on ? 'flex' : 'none';
        btnEdit.style.display = on ? 'none' : 'inline-flex';
    }

    setEditing(false);

    // ===== Load Profile Data =====
    async function loadProfile(){
        try{
            const res = await fetch('../../../backend/usersystem/getusrPro.php');
            const data = await res.json();
            if(data.success){
                const user = data.data;
                document.getElementById('nameShow').textContent = user.username;
                document.getElementById('emailShow').textContent = user.email;
                document.getElementById('inputusername').value = user.username;
                document.getElementById('inputemail').value = user.email;
                document.getElementById('inputpassword').value = ''; // leave blank
            }
        } catch(err){
            console.error("Error loading profile:", err);
        }
    }

    await loadProfile();

    // ===== Edit / Cancel =====
    btnEdit.addEventListener('click', () => setEditing(true));
    btnCancel.addEventListener('click', () => {
        form.reset();
        setEditing(false);
    });

    // ===== Save Profile =====
    form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('inputusername').value;
    const email = document.getElementById('inputemail').value;
    const password = document.getElementById('inputpassword').value;

    try {
        const res = await fetch('../../../backend/usersystem/updateprofile.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        const data = await res.json();

        if(data.success){
            document.getElementById('nameShow').textContent = username;
            document.getElementById('emailShow').textContent = email;
            alert(data.message);
            setEditing(false);

            // ===== อัปเดต navbar หลังแก้ไข username =====
            if(typeof updateNavbar === 'function'){
                updateNavbar(username, data.role || 'user'); // role เดิมจาก session
            }
        } else {
            alert(data.message);
        }
    } catch(err){
        console.error(err);
        alert('Error updating profile');
    }
});


    // ===== Verify Email Button =====
    btnVerifyEmail.addEventListener('click', async () => {
        try{
            const res = await fetch('../../../backend/usersystem/sendconfirmemail.php', { method: 'POST' });
            const data = await res.json();
            alert(data.message);
        } catch(err){
            console.error("Error sending verify email:", err);
            alert("Failed to send verification email");
        }
    });
});
