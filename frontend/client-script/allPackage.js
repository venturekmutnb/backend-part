document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('../../backend/adminsystem/Mpackage/getpackage.php');
    const packages = await res.json();

    const sections = {
      new10: document.querySelector('#new10Section .packagegrid'),
      early: document.querySelector('#earlySection .packagegrid'),
      last: document.querySelector('#lastSection .packagegrid'),
      all: document.querySelector('#allSection .packagegrid')
    };

    Object.values(sections).forEach(grid => grid.innerHTML = '');

    packages.forEach(p => {
      const promoNames = p.promotions.map(x => x.name.toLowerCase());

      if (promoNames.includes('new10')) sections.new10.innerHTML += renderPackage(p);
      if (promoNames.includes('early15')) sections.early.innerHTML += renderPackage(p);
      if (promoNames.includes('last10')) sections.last.innerHTML += renderPackage(p);

      sections.all.innerHTML += renderPackage(p); 
    });
  } catch(err) {
    console.error(err);
    alert('ไม่สามารถโหลด package ได้');
  }
});

function renderPackage(p) {
  const imageFile = p.image_url ? encodeURIComponent(p.image_url.split('/').pop()) : '';
  const badge = p.promotions.length ? p.promotions.map(x=>x.name).join(', ') : '';

  return `
  <div class="packagebox">
    ${badge ? `<div class="packagebadge">${badge}</div>` : ''}
    <img class="packageimg" src="../../backend/adminsystem/Mpackage/getimage.php?file=${imageFile}" alt="${p.title}">
    <div class="packagebody">
      <h3 class="packagename">${p.title}</h3>
      <div class="packageinfo">
        <p class="packagedata">${p.destination} ${p.duration_days} วัน</p>
        <p class="packagedate">เดินทาง: ${p.travel_date}</p>
      </div>
      <div class="packageinfo">
        <p class="packageprice">${Number(p.price).toLocaleString()} บาท</p>
        <p class="packageseat">คงเหลือ: ${p.available_seats}</p>
      </div>
      <div class="packageactions">
        <a class="packagebtn" href="packageDetail.html?id=${p.package_id}">ดูรายละเอียด</a>
      </div>
    </div>
  </div>`;
}