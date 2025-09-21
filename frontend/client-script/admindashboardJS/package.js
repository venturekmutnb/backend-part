// manage_package.js
let plansCount = 0;
let promotions = [];
console.log('package.js loaded');
async function init() {
  await loadPromotions();
  bindAddDay();
  document.getElementById('addPackageForm').addEventListener('submit', submitAddPackage);
  document.getElementById('addPromoForm').addEventListener('submit', submitAddPromo);
  document.getElementById('closeEdit').addEventListener('click', () => document.getElementById('editModal').style.display='none');
  document.getElementById('editPackageForm').addEventListener('submit', submitEditPackage);
  loadPackages();
}

function bindAddDay(){
  document.getElementById('addDayBtn').addEventListener('click', () => {
    plansCount++;
    const div = document.createElement('div');
    div.className = 'plan';
    div.innerHTML = `
      <strong>Day ${plansCount}</strong>
      <div class="row"><label>Title</label><input name="day_title_${plansCount}" required></div>
      <div class="row"><label>Activities</label><textarea name="day_activities_${plansCount}"></textarea></div>
      <div class="row"><label>Meal</label><input name="day_meal_${plansCount}"></div>
      <div class="row"><label>Hotel</label><input name="day_hotel_${plansCount}"></div>
      <button type="button" onclick="this.parentElement.remove()">Remove Day</button>
    `;
    document.getElementById('plansContainer').appendChild(div);
  });
}

async function loadPromotions(){
  const res = await fetch('../../../backend/adminsystem/Mpackage/getpro.php');
  promotions = await res.json();

  const container = document.getElementById('promoCheckboxes');
  container.innerHTML = '';

  promotions.forEach(p => {
    const label = document.createElement('label');
    label.innerHTML = `<input type="checkbox" name="promo_${p.promo_id}" value="${p.promo_id}"> ${p.name} (${p.discount_percent}%)`;
    container.appendChild(label);
  });
}


async function loadPackages(){
  const res = await fetch('../../../backend/adminsystem/Mpackage/getpackage.php');
  const data = await res.json();
  const tbody = document.querySelector('#packagesTable tbody');
  tbody.innerHTML = '';
  data.forEach(p=>{
    const tr = document.createElement('tr');
    const promos = p.promotions ? p.promotions.map(x=>x.name).join(', ') : '';
    tr.innerHTML = `
      <td>${p.package_id}</td>
      <td>${p.title}</td>
      <td>${p.destination}</td>
      <td>${p.travel_date}</td>
      <td>${Number(p.price).toLocaleString()}</td>
      <td>${p.available_seats}</td>
      <td>${promos}</td>
      <td>
        <button onclick="openEdit(${p.package_id})">Edit</button>
        <button class="danger" onclick="deletePackage(${p.package_id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// build plans JSON from dynamic inputs
function gatherPlans(form){
  const plans = [];
  const container = document.getElementById('plansContainer');
  // find plan blocks
  const blocks = container.querySelectorAll('.plan');
  blocks.forEach((blk, idx)=>{
    const day = idx+1;
    const title = blk.querySelector(`[name="day_title_${day}"]`)?.value || '';
    const activities = blk.querySelector(`[name="day_activities_${day}"]`)?.value || '';
    const meal = blk.querySelector(`[name="day_meal_${day}"]`)?.value || '';
    const hotel = blk.querySelector(`[name="day_hotel_${day}"]`)?.value || '';
    plans.push({day_number: day, title, activities, meal_info: meal, hotel_info: hotel});
  });
  return plans;
}

async function submitAddPackage(e){
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  // collect promotion checkboxes
  document.querySelectorAll('#promoCheckboxes input[type="checkbox"]').forEach(cb=>{
    if (cb.checked) formData.append('promotions[]', cb.value);
  });

  // collect plans as JSON string
  formData.append('plans', JSON.stringify(gatherPlans(form)));

  const res = await fetch('../../../backend/adminsystem/Mpackage/addpackage.php', {method:'POST', body: formData});
  const text = await res.text();
  if (text.trim() === 'success') {
    alert('Package added');
    form.reset();
    document.getElementById('plansContainer').querySelectorAll('.plan').forEach(n=>n.remove());
    plansCount=0;
    loadPackages();
  } else alert('Error: '+text);
}

async function submitAddPromo(e){
  e.preventDefault(); // ป้องกัน form submit ปกติ
  const form = e.target;
  const formData = new FormData(form);

  try {
    const res = await fetch('../../../backend/adminsystem/Mpackage/addpromotion.php', {
      method: 'POST',
      body: formData
    });

    const text = await res.text();
    if(text.trim() === 'success') {
      alert('Promotion created');
      form.reset();
      loadPromotions(); // โหลด checkbox ใหม่
    } else {
      alert('Error: ' + text);
    }
  } catch(err) {
    console.error(err);
    alert('Fetch error');
  }
}

async function deletePackage(id){
  if (!confirm('ต้องการลบแพ็กเกจนี้หรือไม่?')) return;
  const res = await fetch(`../../../backend/adminsystem/Mpackage/deletepackage.php?id=${id}`);
  const t = await res.text();
  if (t.trim()==='success'){ alert('Deleted'); loadPackages(); }
  else alert('Error: '+t);
}

async function openEdit(id){
  // fetch package detail (you can reuse get_packages and find)
  const res = await fetch('../../../backend/adminsystem/Mpackage/getpackage.php');
  const data = await res.json();
  const p = data.find(x=>x.package_id==id);
  if (!p) return alert('Not found');
  document.getElementById('edit_package_id').value = p.package_id;
  document.getElementById('edit_title').value = p.title;
  document.getElementById('edit_destination').value = p.destination;
  document.getElementById('edit_duration_days').value = p.duration_days;
  document.getElementById('edit_travel_date').value = p.travel_date;
  document.getElementById('edit_price').value = p.price;
  document.getElementById('edit_available_seats').value = p.available_seats;
  document.getElementById('edit_description').value = p.description || '';
  document.getElementById('editModal').style.display = 'block';
}

async function submitEditPackage(e){
  e.preventDefault();
  const f = new FormData(e.target);
  const res = await fetch('../../../backend/adminsystem/Mpackage/updatepackage.php',{method:'POST',body:f}); 
  const t = await res.text();
  if (t.trim()==='success'){ alert('Updated'); document.getElementById('editModal').style.display='none'; loadPackages(); }
  else alert('Error: '+t);
}

document.addEventListener('DOMContentLoaded', init);
