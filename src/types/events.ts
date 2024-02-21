export enum AttendanceMode {
	OFFLINE = "Offline",
	ONLINE = "Online",
	MIXED = "Mixed",
}

export interface Attendance {
	attendanceMode: AttendanceMode,
	virtualLocationUrl?: string,
}

export interface AgeRange {
	minValue?: number,
	maxValue?: number,
}

export enum EventStatus {
	SCHEDULED = "Scheduled",
	RESCHEDULED = "Rescheduled",
	POSTPONED = "Postponed",
	CANCELED = "Canceled",
	EVENT_MOVED_ONLINE = "Event Moved Online",
}

export interface EntityReference {
	entityId: string,
	name: string,
}

export enum TicketAvailability {
	IN_STOCK = "In Stock",
	SOLD_OUT = "Sold Out",
	PRE_ORDER = "Pre Order",
	UNSPECIFIED = "Unspecified",
}

export interface TicketPriceRange {
	minValue?: number,
	maxValue?: number,
	currencyCode?: string,
}

export interface Time {
	start?: any,
	end?: any,
}

export interface Address {
	line1?: string,
	line2?: string,
	line3?: string,
	sublocality?: string,
	city?: string,
	region?: string,
	postalCode?: string,
	extraDescription?: string,
	countryCode?: string,
}

export interface Coordinate {
	latitude?: number,
	longitude?: number,
}

export enum C_EventAudiance {
	EVERYONE = "Everyone",
	YOUTH = "Youth",
	WOMEN = "Women",
	MEN = "Men",
	GIRLS__11__ = "Girls (11+)",
	BOYS__11__ = "Boys (11+)",
	CHILDREN__3_11_ = "Children (3-11)",
	SINGLE_ADULTS__18_30_ = "Single Adults (18-30)",
	SINGLE_ADULTS__31__ = "Single Adults (31+)",
}

export enum C_eventTypes {
	CHRISTMAS_PARTY = "Christmas Party",
	CHURCH_HQ_WORLDWIDE_EVENT = "Church HQ Worldwide Event",
	DEVOTIONAL___MUSIC = "Devotional & Music",
	GENERAL_ACTIVITIES = "General Activities",
	LEADERSHIP_MEETINGS = "Leadership Meetings",
	SERVICE_PROJECTS = "Service Projects",
	SPORTING_EVENT = "Sporting Event",
	SUNDAY_WORSHIP = "Sunday Worship",
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

export enum IHaveReadAndAgreeToTheLocalUnitWebpageContentSubmissionAgreementAndTheTermsOfUseHttpslocalunitschurchofjesuschristorglocalunitwebsitecontentsubmissionagreement {
	Yes = "Yes",
}

export interface C_legalDisclaimer {
	iHaveReadAndAgreeToTheLocalUnitWebpageContentSubmissionAgreementAndTheTermsOfUseHttpslocalunitschurchofjesuschristorglocalunitwebsitecontentsubmissionagreement?: IHaveReadAndAgreeToTheLocalUnitWebpageContentSubmissionAgreementAndTheTermsOfUseHttpslocalunitschurchofjesuschristorglocalunitwebsitecontentsubmissionagreement[],
}

export enum LinkType {
	OTHER = "Other",
	URL = "URL",
	PHONE = "Phone",
	EMAIL = "Email",
}

export interface C_primaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_secondaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface C_tertiaryCTA {
	label?: string,
	linkType?: LinkType,
	link?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export interface WebsiteUrl {
	url?: string,
	displayUrl?: string,
	preferDisplayUrl?: boolean,
}

export default interface Event {
	attendance?: Attendance,
	landingPageUrl?: string,
	slug?: string,
	what3WordsAddress?: string,
	ageRange?: AgeRange,
	eventStatus?: EventStatus,
	isFreeEvent?: boolean,
	isTicketedEvent?: boolean,
	linkedLocation?: EntityReference,
	organizerEmail?: string,
	organizerName?: string,
	organizerPhone?: any,
	performers?: string[],
	additionalPromotingLocations?: EntityReference[],
	ticketAvailability?: TicketAvailability,
	ticketPriceRange?: TicketPriceRange,
	ticketSaleDateTime?: any,
	ticketUrl?: string,
	time: Time,
	venueName?: string,
	address?: Address,
	description?: string,
	name: string,
	categories?: any,
	cityCoordinate?: Coordinate,
	c_additionalInfo?: any,
	c_EventAudiance?: C_EventAudiance[],
	c_audience?: string,
	c_event_description_long?: string,
	c_eventEndDate?: string,
	c_eventLocation?: string,
	c_eventStartDate?: string,
	c_eventTime?: string,
	c_eventTypes?: C_eventTypes[],
	c_eventsDescription?: string,
	c_eventsSubheading?: string,
	c_heroImage?: Image,
	c_legalDisclaimer?: C_legalDisclaimer,
	c_photo?: Image,
	c_primaryCTA?: C_primaryCTA,
	c_secondaryCTA?: C_secondaryCTA,
	c_tertiaryCTA?: C_tertiaryCTA,
	displayCoordinate?: Coordinate,
	dropoffCoordinate?: Coordinate,
	photoGallery?: ComplexImage[],
	geocodedCoordinate?: Coordinate,
	keywords?: string[],
	pickupCoordinate?: Coordinate,
	routableCoordinate?: Coordinate,
	id: string,
	timezone?: any,
	walkableCoordinate?: Coordinate,
	websiteUrl?: WebsiteUrl,
	yextDisplayCoordinate?: Coordinate,
	yextDropoffCoordinate?: Coordinate,
	yextPickupCoordinate?: Coordinate,
	yextRoutableCoordinate?: Coordinate,
	yextWalkableCoordinate?: Coordinate,
}
