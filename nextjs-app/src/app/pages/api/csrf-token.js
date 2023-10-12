export const csrf = async () => {
    await axios.get('http://localhost:8000/sanctum/csrf-cookie ');
};
