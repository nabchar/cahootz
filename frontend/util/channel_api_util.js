
export const fetchAllChannels = () => (
  $.ajax({
    method: 'GET',
    url: 'api/channels',
  })
);

export const createChannel = channel => {
  return $.ajax({
    url: 'api/channels',
    method: 'POST',
    data: { channel }
  });
};

export const deleteChannel = id => (
  $.ajax({
    url: `api/channels/${id}`,
    method: 'DELETE'
  })
);

export const fetchSingleChannel = id => (
  $.ajax({
    method: 'GET',
    url: `api/channels/${id}`
  })
);


export const updateChannel = channel => {
  return $.ajax({
    url: `api/channels/${channel.id}`,
    method: 'PATCH',
    data: channel
  });
};


export const fetchSubscribedChannels = () => (
  $.ajax({
    method: 'GET',
    url: 'api/subscriptions'
  })
);

export const subscribeToChannel = channelId => {
  return $.ajax({
    url: `api/subscriptions`,
    method: 'POST',
    data: {channelId}
  });
};

export const unsubscribeFromChannel = id => (
  $.ajax({
    url: `api/subscriptions/${id}`,
    method: 'DELETE'
  })
);

export const fetchDirectMessages = () => (
  $.ajax({
    method: 'GET',
    url: `api/direct_messages`
  })
);

export const fetchDirectMessage = (id) => (
  $.ajax({
    method: 'GET',
    url: `api/direct_messages/${id}`
  })
);

export const createDirectMessage = (members ) => {
  return $.ajax({
    method: 'POST',
    url: 'api/direct_messages',
    data: {members}
  });
};
