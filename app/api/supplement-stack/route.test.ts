import handler from './route';

describe('supplement-stack API', () => {
  it('returns 200 on POST', () => {
    const req = { method: 'POST' } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), end: jest.fn() } as any;
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Protocol sent!' });
  });

  it('returns 405 on GET', () => {
    const req = { method: 'GET' } as any;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn(), end: jest.fn() } as any;
    handler(req, res);
    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.end).toHaveBeenCalled();
  });
});
