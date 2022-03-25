const getForm = async (id) => {
  const response = await fetch(`${process.env.REACT_APP_BE_URL}/forms/${id}`, {
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

export default getForm;
