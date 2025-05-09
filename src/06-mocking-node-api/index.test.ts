import * as fs from 'fs';
import * as fsPromises from 'fs/promises';
import { readFileAsynchronously } from '.';

jest.mock('fs');
jest.mock('fs/promises');

describe('readFileAsynchronously', () => {
  const mockExistsSync = fs.existsSync as jest.Mock;
  const mockReadFile = fsPromises.readFile as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return null if file does not exist', async () => {
    mockExistsSync.mockReturnValue(false);

    const result = await readFileAsynchronously('nonexistent.txt');

    expect(result).toBeNull();
    expect(mockReadFile).not.toHaveBeenCalled();
  });

  test('should return file content if file exists', async () => {
    mockExistsSync.mockReturnValue(true);
    mockReadFile.mockResolvedValue(Buffer.from('Hello, world!'));

    const result = await readFileAsynchronously('file.txt');

    expect(result).toBe('Hello, world!');
    expect(mockReadFile).toHaveBeenCalled();
  });
});
