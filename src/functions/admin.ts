const isAdmin = () =>
{
    const LS = sessionStorage.length !== 0 ? sessionStorage.getItem('isAdmin') : 'no'
    if (LS === 'no') return false
    else if (LS === 'yes') return true
}

export default isAdmin