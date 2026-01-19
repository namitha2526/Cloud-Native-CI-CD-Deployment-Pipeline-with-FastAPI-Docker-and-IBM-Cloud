const container = document.getElementById("roadmap-container");

async function callBackend() {
  try {
    const res = await fetch("https://YOUR-BACKEND.onrender.com/");
    const data = await res.json();

    // Example display (adjust if your API returns array)
    container.innerHTML = `
      <div class="card">
        <h3>Backend Response</h3>
        <p>${JSON.stringify(data)}</p>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<p>Error connecting to backend</p>`;
  }
}

function addRoadmap() {
  const name = document.getElementById("name").value;
  const title = document.getElementById("title").value;
  const desc = document.getElementById("description").value;

  if (!name || !title || !desc) {
    alert("Fill all fields");
    return;
  }

  const card = `
    <div class="card">
      <h3>${title}</h3>
      <p>${desc}</p>
      <small>By ${name}</small>
    </div>
  `;

  container.innerHTML += card;

  document.getElementById("name").value = "";
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
}
