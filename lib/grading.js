/**
 * Server-side grading logic.
 * Correct answers NEVER leave this file to the client.
 */

/**
 * Grade a single answer against the question definition.
 * @param {Object} question - Prisma Question record (with correctAnswer, tolerance, marks, type)
 * @param {string} studentAnswer - What the student submitted
 * @returns {{ isCorrect: boolean, marksAwarded: number }}
 */
export function gradeAnswer(question, studentAnswer) {
  if (!studentAnswer || studentAnswer.trim() === '') {
    return { isCorrect: false, marksAwarded: 0 }
  }

  if (question.type === 'MCQ') {
    const isCorrect = studentAnswer.trim() === question.correctAnswer.trim()
    return {
      isCorrect,
      marksAwarded: isCorrect ? question.marks : 0,
    }
  }

  if (question.type === 'NUMERICAL') {
    const studentNum = parseFloat(studentAnswer)
    const correctNum = parseFloat(question.correctAnswer)

    if (isNaN(studentNum) || isNaN(correctNum)) {
      return { isCorrect: false, marksAwarded: 0 }
    }

    const tolerance = question.tolerance ?? 0
    const isCorrect = Math.abs(studentNum - correctNum) <= tolerance

    return {
      isCorrect,
      marksAwarded: isCorrect ? question.marks : 0,
    }
  }

  return { isCorrect: false, marksAwarded: 0 }
}

/**
 * Grade all answers in a submission.
 * @param {Array} questions - Array of Question records
 * @param {Object} answersMap - { [questionId]: studentAnswer }
 * @returns {{ gradedAnswers: Array, totalScore: number, maxScore: number }}
 */
export function gradeSubmission(questions, answersMap) {
  let totalScore = 0
  let maxScore = 0
  const gradedAnswers = []

  for (const question of questions) {
    const studentAnswer = answersMap[question.id] ?? ''
    const { isCorrect, marksAwarded } = gradeAnswer(question, studentAnswer)

    maxScore += question.marks
    totalScore += marksAwarded

    gradedAnswers.push({
      questionId: question.id,
      studentAnswer,
      isCorrect,
      marksAwarded,
    })
  }

  return { gradedAnswers, totalScore, maxScore }
}
