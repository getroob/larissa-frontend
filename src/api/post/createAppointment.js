const createAppointment = async (appointment, kid) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URL}/appointments`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      datetime: appointment.toISOString(),
      kidFormId: kid,
    }),
    credentials: "include",
  });

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(
      JSON.stringify({ text: await response.text(), status: response.status })
    );
  }
};

export default createAppointment;
