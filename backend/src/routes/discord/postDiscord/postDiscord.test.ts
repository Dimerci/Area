import { postDiscord } from './postDiscord';
import { Request, Response, NextFunction } from 'express';
import { PostRequestToDiscordBot } from './postRequestToDiscordBot';

jest.mock('./postRequestToDiscordBot');

describe('postDiscord', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should throw an error if the message field is missing', async () => {
        const req = {
            body: {}
        }    as Request<void, void, { message: string }, void>;
        const res = {} as Response;
        const next = jest.fn();

        await postDiscord(req, res, next);

        expect(next).toHaveBeenCalledWith(new Error('Missing required field: message'));
    });

    it('should call PostRequestToDiscordBot with the correct message', async () => {
        const req = {
            body: {
                message: 'Hello, world!'
            }
        } as Request<void, void, { message: string }, void>;
        const res = {} as Response;
        const next = jest.fn();

        await postDiscord(req, res, next);

        expect(PostRequestToDiscordBot).toHaveBeenCalledWith({ message: 'Hello, world!' });
    });

    it('should call PostRequestToDiscordBot with the correct message when the message field is present', async () => {
        const req = {
            body: {
                message: 'Hello, world!'
            }
        } as Request<void, void, { message: string }, void>;
        const res = {} as Response;
        const next = jest.fn();

        await postDiscord(req, res, next);

        expect(PostRequestToDiscordBot).toHaveBeenCalledWith({ message: 'Hello, world!' });
    });
});