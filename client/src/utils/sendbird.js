

export function connect(sb, userId) {
  return new Promise((resolve, reject) => {
    if(!sb) {
      reject(`Incollect argument. sb is required.`);
    }
    if(!userId) {
      reject(`Incollect argument. userId is required.`);
    }

    sb.connect(userId, (user, error) => {
      error
        ? reject(error)
        : resolve(user);
    });
  });
}

export function openChannel(sb, channelId) {
  return new Promise((resolve, reject) => {
    if(!sb) {
      reject(`Incollect argument. sb is required.`);
    }
    if(!channelId) {
      reject(`Incollect argument. channelId is required.`);
    }

    sb.OpenChannel.getChannel(channelId, (openedChannel, error) => {
      error
          ? reject(error)
          : resolve(openedChannel);
    });
  });
}



export function enterChannel(channel) {
return new Promise((resolve, reject) => {
  if(!channel) {
    reject(`Incollect argument. channel is required.`);
  }

  channel.enter(function(response, error) {
    error
        ? reject(error)
        : resolve('OK!');
    })
  });
}


export function sendMessage(channel, message) {
  return new Promise((resolve, reject) => {
    if(!channel) {
      reject(`Incollect argument. channel is required.`);
    }

    if(!message) {
      reject(`Incollect argument. message is required.`);
    }

    console.log('XXXXXXXXXXXX', message)
    channel.sendUserMessage(message, (msg, error) => {
      error
        ? reject(error)
        : resolve(msg);
    });
  });
}

export function sendFileMessage(channel, file) {
  return new Promise((resolve, reject) => {
    if(!channel) {
      reject(`Incollect argument. channel is required.`);
    }

    if(!file) {
      reject(`Incollect argument. file is required.`);
    }

    console.log('XXXXXXXXXXXX', file)
    channel.sendFileMessage(file, (msg, error) => {
      error
        ? reject(error)
        : resolve(msg);
    });
  });
}


export function updateMessage(channel, message, messageText) {
  return new Promise((resolve, reject) => {
    if(!channel) {
      reject(`Incollect argument. channel is required.`);
    }

    if(!message) {
      reject(`Incollect argument. message is required.`);
    }

    if(!messageText) {
      reject(`Incollect argument. messageText is required.`);
    }

    channel.updateUserMessage(
      message.messageId,
      messageText,
      message.data,
      message.customType,
      (msg, error) => {
        error
          ? reject(error)
          : resolve(msg);
      }
    );
  });
}


export function deleteMessage(channel, message) {
  return new Promise((resolve, reject) => {
    if(!channel) {
      reject(`Incollect argument. channel is required.`);
    }

    if(!message) {
      reject(`Incollect argument. message is required.`);
    }

    channel.deleteMessage(Object.assign({}, message), (res, error) => {
      error
        ? reject(error)
        : resolve('OK');
    });
  });
}



export function getMessage(query) {
  return new Promise((resolve, reject) => {
    if(!query) {
    reject(`Incollect argument. query is required.`);
    }

    if (query.hasMore && !query.isLoading) {
      query.load(50, false, (messageList, error) => {
        error
          ? reject(error)
          : resolve(messageList);
      });
    } else {
      resolve([]);
    }
  });
}
