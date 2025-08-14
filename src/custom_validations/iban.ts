/**
 * @summary IBAN Specification class
 */
export class IBANSpecification {
    /** the code of the country */
    readonly countryCode: string;
    /** the length of the IBAN */
    readonly length: number;
    /** the structure of the underlying BBAN (for validation and formatting) */
    readonly structure: string;
    /** an example valid IBAN */
    readonly example: string;

    constructor(countryCode: string, length: number, structure: string, example: string) {
        this.countryCode = countryCode;
        this.length = length;
        this.structure = structure;
        this.example = example;
    }

    /**
     * Check if the passed iban is valid according to this specification.
     */
    isValid(iban: string): boolean {
        // Base validation logic - can be overridden by subclasses
        throw new Error('Method not implemented');
    }

    /**
     * Convert the passed IBAN to a country-specific BBAN.
     */
    toBBAN(iban: string, separator: string = ' '): string {
        throw new Error('Method not implemented');
    }

    /**
     * Convert the passed BBAN to an IBAN for this country specification.
     * Please note that "generation of the IBAN shall be the exclusive responsibility of the bank/branch servicing the account".
     * This method implements the preferred algorithm described in http://en.wikipedia.org/wiki/International_Bank_Account_Number#Generating_IBAN_check_digits
     */
    fromBBAN(bban: string): string {
        throw new Error('Method not implemented');
    }

    /**
     * Check if the passed BBAN is valid.
     * This function only checks the format of the BBAN (length and matching the letter/number specs) but does not
     * verify the check digit.
     */
    isValidBBAN(bban: string): boolean {
        throw new Error('Method not implemented');
    }
}

/**
 * @summary Main IBAN validation class
 * @author Cyril Schumacher
 */
export class IBAN {
    /**
     * An object containing all the known IBAN specifications
     */
    static countries: Record<string, IBANSpecification> = {};

    /**
     * @summary Returns the IBAN in electronic format.
     * @param iban The IBAN to convert.
     * @returns The IBAN in electronic format.
     */
    static electronicFormat(iban: string): string {
        throw new Error('Method not implemented');
    }

    /**
     * @summary Convert the passed BBAN to an IBAN for this country specification.
     * @param countryCode The country of the BBAN.
     * @param bban The BBAN to convert to IBAN.
     * @returns The IBAN.
     */
    static fromBBAN(countryCode: string, bban: string): string {
        const spec = this.countries[countryCode];
        if (!spec) {
            throw new Error(`No specification found for country code: ${countryCode}`);
        }
        return spec.fromBBAN(bban);
    }

    /**
     * @summary Check if the passed iban is valid according to this specification.
     * @param iban The iban to validate.
     * @returns True if valid, false otherwise.
     */
    static isValid(iban: string): boolean {
        throw new Error('Method not implemented');
    }

    /**
     * @summary Check if the passed BBAN is valid.
     * @param countryCode The country of the BBAN.
     * @param bban The BBAN to validate.
     * @returns True if valid, false otherwise.
     */
    static isValidBBAN(countryCode: string, bban: string): boolean {
        const spec = this.countries[countryCode];
        if (!spec) {
            throw new Error(`No specification found for country code: ${countryCode}`);
        }
        return spec.isValidBBAN(bban);
    }

    /**
     * @summary Returns the IBAN in print format.
     * @param iban The IBAN to convert.
     * @param separator The separator to use between IBAN blocks, defaults to ' '.
     */
    static printFormat(iban: string, separator: string = ' '): string {
        throw new Error('Method not implemented');
    }

    /**
     * @summary Convert the passed IBAN to a country-specific BBAN.
     * @param iban The IBAN to convert.
     * @param separator The separator to use between BBAN blocks, defaults to ' '.
     * @returns The BBAN
     */
    static toBBAN(iban: string, separator: string = ' '): string {
        throw new Error('Method not implemented');
    }

    /**
     * Register a new IBAN specification for a country
     */
    static registerCountry(specification: IBANSpecification): void {
        this.countries[specification.countryCode] = specification;
    }
}

export default IBAN;