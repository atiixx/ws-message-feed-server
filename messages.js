import sql from "./db.js";

export async function getLastMessages() {
  const messages = await sql`
    select
    id,
      name,
      message,
      date
    from messages order by id desc limit 100
  `;
  return messages;
}

export async function insertMessage({ name, message, date }) {
  const messages = await sql`
    insert into messages
      (name, message, date)
    values
      (${name}, ${message}, ${date})
    returning id, name, message, date
  `;
  return messages;
}

export async function saveToDB(data) {
  try {
    const parsedData = JSON.parse(data.toString());
    if (
      parsedData.name &&
      parsedData.message &&
      parsedData.name != "Notification" &&
      parsedData.date
    ) {
      await insertMessage({
        name: parsedData.name,
        message: parsedData.message,
        date: parsedData.date,
      });
    }
  } catch (e) {
    console.error("Could not insert data into DB: ", data.toString());
    console.error(e);
  }
}
