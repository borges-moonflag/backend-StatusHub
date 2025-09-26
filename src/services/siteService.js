const db = require("../config/db");

// Lista todos os sites
exports.getAllSites = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM sites");
    return rows;
  } catch (error) {
    console.error("Erro ao buscar sites:", error);
    return [];
  }
};

// Pega site por ID
exports.getSiteById = async (id) => {
  const [rows] = await db.query("SELECT * FROM sites WHERE id = ?", [id]);
  return rows[0];
};

// Adiciona site
exports.addSite = async ({ name, url }) => {
  const [result] = await db.query(
    "INSERT INTO sites (name, url) VALUES (?, ?)",
    [name, url]
  );
  return { id: result.insertId, name, url };
};

// Atualiza site
exports.updateSite = async (id, { name, url, notify }) => {
  await db.query(
    "UPDATE sites SET name = ?, url = ?, notify = ? WHERE id = ?",
    [name, url, notify, id]
  );
  return { id, name, url, notify };
};

// Remove site
exports.deleteSite = async (id) => {
  await db.query("DELETE FROM sites WHERE id = ?", [id]);
  return { id };
};

// Atualiza status do site
exports.updateSiteStatus = async ({ id, status, response_time, last_checked }) => {
  // Atualiza contadores e uptime
  const site = await exports.getSiteById(id);
  let success_count = site.success_count;
  let fail_count = site.fail_count;

  if (status === "UP") success_count++;
  else fail_count++;

  const uptime_percentage = ((success_count / (success_count + fail_count)) * 100).toFixed(2);

  await db.query(
    `UPDATE sites 
     SET status = ?, response_time = ?, last_checked = ?, success_count = ?, fail_count = ?, uptime_percentage = ? 
     WHERE id = ?`,
    [status, response_time, last_checked, success_count, fail_count, uptime_percentage, id]
  );
};
