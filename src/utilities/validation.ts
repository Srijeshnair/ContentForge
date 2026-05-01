export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface GeneratorFormData {
  contentType: string;
  topic: string;
}

const TOPIC_MIN_LENGTH = 2;
const TOPIC_MAX_LENGTH = 500;

export function validateGeneratorForm(data: GeneratorFormData): ValidationResult {
  const errors: Record<string, string> = {};

  // Validate content type
  if (!data.contentType || data.contentType.trim() === '') {
    errors.contentType = 'Please select a content type';
  }

  // Validate topic
  if (!data.topic || data.topic.trim() === '') {
    errors.topic = 'Please enter a topic';
  } else if (data.topic.trim().length < TOPIC_MIN_LENGTH) {
    errors.topic = `Topic must be at least ${TOPIC_MIN_LENGTH} characters`;
  } else if (data.topic.trim().length > TOPIC_MAX_LENGTH) {
    errors.topic = `Topic must not exceed ${TOPIC_MAX_LENGTH} characters`;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function hasValidationError(
  fieldName: keyof GeneratorFormData,
  errors: Record<string, string>
): boolean {
  return Boolean(errors[fieldName]);
}

export function getValidationError(
  fieldName: keyof GeneratorFormData,
  errors: Record<string, string>
): string | null {
  return errors[fieldName] || null;
}

export function normalizeGeneratorForm(data: GeneratorFormData): GeneratorFormData {
  return {
    contentType: data.contentType.trim(),
    topic: data.topic.trim(),
  };
}
