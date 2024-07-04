const addRandomNumbers = (username: string) => {
    const randomNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join("");
    return `${username}_${randomNumbers}`
}

export default addRandomNumbers