import { jest } from '@jest/globals';
import { networks, ShareData } from '../../src/forum/util/share';

const payload: ShareData = { url: 'https://example.com/d/1-hello', title: 'Hello', description: 'The first post' };

const nativeShare = networks.native as (data: ShareData) => Promise<void> | void;

function stubShare(outcome: () => Promise<void>) {
  Object.defineProperty(navigator, 'share', { value: jest.fn(outcome), configurable: true, writable: true });
}

afterEach(() => {
  delete (navigator as any).share;
});

describe('native sharing', () => {
  it("hands the discussion to the device's share sheet", async () => {
    stubShare(() => Promise.resolve());

    await nativeShare(payload);

    expect(navigator.share).toHaveBeenCalledWith({ title: 'Hello', text: 'The first post', url: 'https://example.com/d/1-hello' });
  });

  // The share sheet rejects with an AbortError when the reader dismisses it.
  // That's them changing their mind, not a failure, and left unhandled it is
  // reported as an error.
  it('treats a dismissed share sheet as done', async () => {
    stubShare(() => Promise.reject(new DOMException('Abort due to cancellation of share.', 'AbortError')));

    await expect(nativeShare(payload)).resolves.toBeUndefined();
  });

  it('still fails when sharing itself fails', async () => {
    stubShare(() => Promise.reject(new DOMException('Permission denied', 'NotAllowedError')));

    await expect(nativeShare(payload)).rejects.toThrow('Permission denied');
  });
});
