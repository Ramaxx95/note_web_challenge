
const BASE_URL = "/api/notes";

export async function getActiveNotes() {

  const response = await fetch(BASE_URL + "/active");
  
  if(!response.ok){
    throw new Error("Couldn't obtain notes...");
  }

  return response.json();
}

export async function getArchivedNotes() {
  
  const response = await fetch(BASE_URL + "/archive");
  
  return response.json();
}

export async function createNote(body) {
  
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error("Couldn't create a new note...");
  }

  return response.json();
}

export async function editNote(body, id) {
  
  const response = await fetch(BASE_URL + "/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error("Couldn't update this note...");
  }

  return response.json();
}

export async function deleteNote(id) {
  
  const response = await fetch(BASE_URL + "/" + id, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error("Couldn't delete this note...");
  }
}

export async function toggleArchive(id) {
  
  const response = await fetch(BASE_URL + "/" + id + "/archive", {
    method: "PATCH"
  });

  if (!response.ok) {
    throw new Error("Couldn't archive/unarchive this note...");
  }

  return response.json();
}