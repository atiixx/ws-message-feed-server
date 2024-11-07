import sql from "./db.js";

export async function getLastMessages() {
  const messages = await sql`
    select
    id,
      name,
      message
    from messages order by id desc limit 100
  `;
  return messages;
}

export async function insertMessage({ name, message }) {
  const messages = await sql`
    insert into messages
      (name, message)
    values
      (${name}, ${message})
    returning id, name, message
  `;
  return messages;
}

export async function saveToDB(data) {
  try {
    const parsedData = JSON.parse(data.toString());
    if (
      parsedData.name &&
      parsedData.message &&
      parsedData.name != "Notification"
    ) {
      await insertMessage({
        name: parsedData.name,
        message: parsedData.message,
      });
    }
  } catch {
    console.error("Could not insert data into DB: ", data.toString());
  }
}
