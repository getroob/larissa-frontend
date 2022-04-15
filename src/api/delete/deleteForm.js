const deleteForm = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URL}/forms/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    credentials: "include",
    method: "DELETE",
  });

  if (response.ok) {
    return;
  } else {
    throw new Error(
      JSON.stringify({ text: await response.text(), status: response.status })
    );
  }
};

export default deleteForm;
