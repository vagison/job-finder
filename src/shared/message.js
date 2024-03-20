function createMessageFromText(chatId, text) {
  return {
    chat: {
      id: chatId,
    },
    text,
  }
}

function createMessageFromJob(chatId, job) {
  return {
    chat: {
      id: chatId,
    },
    text: job.link,
  }
}

export { createMessageFromText, createMessageFromJob }
