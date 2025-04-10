
// Simple rate limiter implementation for demo purposes
// In a real application, this would be handled server-side

interface RateLimiterStatus {
  attempts: number;
  locked: boolean;
  timeout?: number;
}

export class RateLimiter {
  private maxAttempts: number;
  private timeWindow: number;
  private storageKey = 'hauler-hero-rate-limiter';

  constructor(maxAttempts: number, timeWindow: number) {
    this.maxAttempts = maxAttempts;
    this.timeWindow = timeWindow;
  }

  private getStoredData(): RateLimiterStatus {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return { attempts: 0, locked: false };
    }
    
    try {
      return JSON.parse(stored);
    } catch (e) {
      return { attempts: 0, locked: false };
    }
  }

  private storeData(data: RateLimiterStatus): void {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  // Check if the current user/IP is locked
  checkLocked(): RateLimiterStatus {
    const data = this.getStoredData();
    
    // If locked and lock timeout exists
    if (data.locked && data.timeout) {
      // Check if lock period has expired
      if (Date.now() > data.timeout) {
        // Reset if lock period expired
        this.reset();
        return { attempts: 0, locked: false };
      }
    }
    
    return data;
  }

  // Record an attempt and return updated status
  attempt(): RateLimiterStatus {
    const data = this.getStoredData();
    
    // If already locked, just return current status
    if (data.locked) {
      return data;
    }
    
    // Increment attempts
    const attempts = data.attempts + 1;
    
    // Check if should be locked
    const locked = attempts >= this.maxAttempts;
    const timeout = locked ? Date.now() + (24 * 60 * 60 * 1000) : undefined; // 24 hours
    
    const newData = { attempts, locked, timeout };
    this.storeData(newData);
    
    return newData;
  }

  // Reset the rate limiter
  reset(): void {
    this.storeData({ attempts: 0, locked: false });
  }
}
