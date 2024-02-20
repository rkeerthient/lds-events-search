export enum EmploymentType {
	FULL_TIME = "Full Time",
	PART_TIME = "Part Time",
	CONTRACTOR = "Contractor",
	TEMPORARY = "Temporary",
	INTERN = "Intern",
	VOLUNTEER = "Volunteer",
	PER_DIEM = "Per Diem",
	OTHER = "Other",
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export interface Location {
	existingLocation?: EntityReference,
	externalLocation?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

export interface YextBoundingBox {
	southWest: Coordinate,
	northEast: Coordinate,
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface C_jobAddress {
	line1: string,
	line2?: string,
	city: string,
	region: string,
	postalCode: string,
}

export default interface Job {
	applicationUrl?: string,
	datePosted?: string,
	employmentType?: EmploymentType,
	hiringOrganization?: string,
	jobLocation?: EntityReference,
	landingPageUrl?: string,
	location?: Location,
	nudgeEnabled?: boolean,
	primaryConversationContact?: any,
	slug?: string,
	validThrough?: any,
	workRemote?: boolean,
	yextBoundingBox?: YextBoundingBox,
	description?: string,
	logo?: ComplexImage,
	name: string,
	c_jobAddress?: C_jobAddress,
	c_locationName?: string,
	c_richDescription?: string,
	displayCoordinate?: Coordinate,
	keywords?: string[],
	id: string,
	timezone?: any,
	yextDisplayCoordinate?: Coordinate,
}
