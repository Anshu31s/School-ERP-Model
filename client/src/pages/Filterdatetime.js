export const getFormattedDate = (datestring) => {
    const date = new Date(datestring);

    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    return `${formattedDate} ${formattedTime}`;
}
