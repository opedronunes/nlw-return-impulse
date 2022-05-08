import { SubmitFeedbackUseCase } from "./submit-feedbacks-use-case"

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackUseCase(
    { create: createFeedbackSpy },
    { sendMail: sendMailSpy }
)

describe('Submit feedback', () => {
    it('should be able to submit a feedback', async () => {
        

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,chsdikgcfjhasdfgdsjgfkhdsga',
        })).resolves.not.toThrow();

        expect(createFeedbackSpy).toHaveBeenCalled();
        expect(sendMailSpy).toHaveBeenCalled();
    });

    it('should not be able to submit feedback without type', async () => {
        

        await expect(submitFeedback.execute({
            type: '',
            comment: 'example comment',
            screenshot: 'data:image/png;base64,chsdikgcfjhasdfgdsjgfkhdsga',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback without comment', async () => {
        

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: '',
            screenshot: 'data:image/png;base64,chsdikgcfjhasdfgdsjgfkhdsga',
        })).rejects.toThrow();
    });

    it('should not be able to submit feedback with an screenshot invalid', async () => {
        

        await expect(submitFeedback.execute({
            type: 'BUG',
            comment: 'Esta tudo bugado!',
            screenshot: 'test.jpg',
        })).rejects.toThrow();
    });
});