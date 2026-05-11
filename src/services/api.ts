import { postJson } from '../utilities/network';
export * from './generatorService';

export type TestAiResponse = {
  success: boolean;
  response: string;
  provider: string;
  model: string;
  isMock?: boolean;
  note?: string;
};

export async function testAiIntegration(prompt: string): Promise<TestAiResponse> {
  return postJson<TestAiResponse, { prompt: string }>('/api/test-ai', { prompt });
}
