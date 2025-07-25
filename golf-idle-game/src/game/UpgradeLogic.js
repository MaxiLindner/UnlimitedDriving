const buyClub = (clubId) => {
    const club = clubs[clubId]
    if (club.costType === 'money' && money >= club.cost) {
        money -= club.cost
        club.owned += 1
    }
    if (club.costType === 'putter' && clubs.putter.owned >= club.cost) {
        clubs.putter.owned -= club.cost
        club.owned += 1
    }
}