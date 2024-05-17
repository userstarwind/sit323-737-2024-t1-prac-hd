const userServerUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8080/user_service"
    : "/user_service";
const emailServerUrl =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8082/email_service"
    : "email_service";

export const createNewUser = async (formData) => {
  let firstName = formData.get("firstName")?.trim() ?? "";
  let lastName = formData.get("lastName")?.trim() ?? "";
  let email = formData.get("email")?.trim() ?? null;
  let password = formData.get("password")?.trim() ?? "";
  let confirmPassword = formData.get("confirmPassword")?.trim() ?? "";

  if (confirmPassword !== password) {
    return {
      success: false,
      message: "The passwords entered must be consistent.",
    };
  }

  if (!firstName || !lastName || !email || !password) {
    return { success: false, message: "Please complete all information." };
  }
  let apiUrl = `${userServerUrl}/create_new_user`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error);
    }

    return { success: true, message: "Welcome to DevHub!", data };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const loginWithEmail = async (formData) => {
  let email = formData.get("email")?.trim() ?? null;
  let password = formData.get("password")?.trim() ?? "";

  if (!email || !password) {
    return { success: false, message: "Please enter both email and password." };
  }

  let loginUrl = `${userServerUrl}/login_with_email`;

  try {
    const response = await fetch(loginUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error || "Login failed. Please check your credentials."
      );
    }

    return { success: true, message: "Login successful. Welcome back!", data };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const publishNewEvent = async (formData, token) => {
  let publishUrl = `${userServerUrl}/publish_new_event`;
  try {
    const response = await fetch(publishUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, message: "Publish event successfully!", data };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const fetchEvents = async () => {
  let fetchEventsUrl = `${userServerUrl}/fetch_events`;
  try {
    const response = await fetch(fetchEventsUrl, {
      method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, message: "Fetch events successfully!", data };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const deleteEvent = async (eventID, token) => {
  let deleteEventUrl = `${userServerUrl}/delete_event`;
  try {
    const response = await fetch(deleteEventUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ eventID }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, message: "Delete event successfully!" };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const removeParticipantFromEvent = async (userID, eventID, token) => {
  let removeParticipantUrl = `${userServerUrl}/remove_participant`;
  try {
    const response = await fetch(removeParticipantUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userID, eventID }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, message: "Cancel reservation successfully!" };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const addParticipantToEvent = async (userID, eventID, token) => {
  let addParticipantUrl = `${userServerUrl}/add_participant`;
  try {
    const response = await fetch(addParticipantUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ userID, eventID }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, message: "Booking event successfully!" };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};

export const sendWelcomeEmail = async (receiverEmail) => {
  let sendWelcomeEmailUrl = `${emailServerUrl}/send_welcome_email`;
  try {
    const response = await fetch(sendWelcomeEmailUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ receiverEmail }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error);
    }
    return { success: true, message: "Welcome to DevHub!" };
  } catch (error) {
    return { success: false, message: `Error: ${error.message}` };
  }
};
