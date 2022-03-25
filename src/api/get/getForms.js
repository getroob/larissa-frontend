const getForms = async (type) => {
  const response = await fetch(
    `${process.env.REACT_APP_BE_URL}/forms${type ? "?type=" + type : ""}`,
    {
      credentials: "include",
    }
  );

  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(
      JSON.stringify({ text: await response.text(), status: response.status })
    );
  }
};

export default getForms;
