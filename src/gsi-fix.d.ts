/**
 * These declarations are currently missing from the @types/gsi package, among others.
 */
declare interface Window {
	google: {
		accounts: {
			oauth2: {
				initTokenClient: (config: TokenClientConfig) => TokenClient;
			};
		};
	};
}

interface TokenClientConfig {
	client_id: string;
	scope: string;
	callback: (tokenResponse: TokenResponse) => void;
	ux_mode?: 'popup' | 'redirect';
	include_granted_scopes?: boolean;
	prompt?: string;
	enable_serial_consent?: boolean;
	hint?: string;
	hosted_domain?: string;
	state?: string;
	error_callback?: () => void;
}

interface TokenResponse {
	access_token: string;
	expires_in: string;
	hd: string;
	prompt: string;
	token_type: string;
	scope: string;
	state: string;
	error: string;
	error_description: string;
	error_uri: string;
}

interface TokenClient {
	requestAccessToken(overrideConfig?: OverridableTokenClientConfig): void;
}

interface OverridableTokenClientConfig {
	scope: string;
	include_granted_scopes: boolean;
	prompt: string;
	enable_serial_consent: boolean;
	hint?: string;
	state?: string;
}
