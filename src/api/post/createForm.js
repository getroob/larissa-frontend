const createForm = async (refugeeId) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URL}/forms`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ userId: refugeeId }),
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

export default createForm;
