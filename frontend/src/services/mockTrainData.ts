/**
 * Mock Train Database
 * Since we don't have a real Indian Railways API, this provides realistic train data
 */

interface TrainInfo {
    trainNumber: string;
    trainName: string;
    route: string;
    stations: string[];
    coaches: string[];
}

const trainDatabase: { [key: string]: TrainInfo } = {
    "12301": {
        trainNumber: "12301",
        trainName: "Howrah Rajdhani Express",
        route: "New Delhi → Howrah",
        stations: ["New Delhi", "Kanpur", "Allahabad", "Mughal Sarai", "Gaya", "Howrah"],
        coaches: ["A1", "A2", "B1", "B2", "B3", "B4", "B5", "H1", "S1", "S2"]
    },
    "12951": {
        trainNumber: "12951",
        trainName: "Mumbai Rajdhani Express",
        route: "New Delhi → Mumbai Central",
        stations: ["New Delhi", "Kota", "Vadodara", "Surat", "Mumbai Central"],
        coaches: ["A1", "A2", "A3", "B1", "B2", "B3", "B4", "B5", "H1"]
    },
    "12431": {
        trainNumber: "12431",
        trainName: "Rajdhani Express",
        route: "New Delhi → Trivandrum",
        stations: ["New Delhi", "Vadodara", "Surat", "Pune", "Bangalore", "Trivandrum"],
        coaches: ["A1", "A2", "B1", "B2", "B3", "B4", "B5", "S1", "S2"]
    },
    "12423": {
        trainNumber: "12423",
        trainName: "Rajdhani Express",
        route: "New Delhi → Dibrugarh",
        stations: ["New Delhi", "Kanpur", "Lucknow", "Gorakhpur", "Guwahati", "Dibrugarh"],
        coaches: ["A1", "A2", "B1", "B2", "B3", "B4", "S1", "S2"]
    },
    "12621": {
        trainNumber: "12621",
        trainName: "Tamil Nadu Express",
        route: "New Delhi → Chennai Central",
        stations: ["New Delhi", "Agra", "Jhansi", "Bhopal", "Nagpur", "Vijayawada", "Chennai"],
        coaches: ["A1", "B1", "B2", "B3", "B4", "B5", "S1", "S2", "S3", "S4"]
    },
    "12259": {
        trainNumber: "12259",
        trainName: "Duronto Express",
        route: "Sealdah → New Delhi",
        stations: ["Sealdah", "Asansol", "Dhanbad", "Gaya", "Mughal Sarai", "New Delhi"],
        coaches: ["A1", "A2", "B1", "B2", "B3", "B4", "S1", "S2"]
    },
    "12009": {
        trainNumber: "12009",
        trainName: "Shatabdi Express",
        route: "Mumbai Central → Ahmedabad",
        stations: ["Mumbai Central", "Borivali", "Vapi", "Surat", "Vadodara", "Ahmedabad"],
        coaches: ["CC1", "CC2", "CC3", "CC4", "CC5", "EC"]
    },
    "12002": {
        trainNumber: "12002",
        trainName: "Bhopal Shatabdi",
        route: "New Delhi → Bhopal",
        stations: ["New Delhi", "Gwalior", "Jhansi", "Bhopal"],
        coaches: ["CC1", "CC2", "CC3", "CC4", "EC"]
    },
    "22691": {
        trainNumber: "22691",
        trainName: "Rajdhani Express",
        route: "New Delhi → Bangalore",
        stations: ["New Delhi", "Vadodara", "Pune", "Bangalore City"],
        coaches: ["A1", "A2", "B1", "B2", "B3", "B4", "F1", "F2", "S1"]
    },
    "12430": {
        trainNumber: "12430",
        trainName: "Lucknow AC SF Express",
        route: "New Delhi → Lucknow",
        stations: ["New Delhi", "Ghaziabad", "Moradabad", "Bareilly", "Lucknow"],
        coaches: ["A1", "A2", "B1", "B2", "B3", "S1", "S2"]
    },
    "12626": {
        trainNumber: "12626",
        trainName: "Karnataka Express",
        route: "New Delhi → Bangalore City",
        stations: ["New Delhi", "Bhopal", "Nagpur", "Gulbarga", "Bangalore City"],
        coaches: ["A1", "B1", "B2", "B3", "B4", "S1", "S2", "S3"]
    },
    "12229": {
        trainNumber: "12229",
        trainName: "Lucknow Mail",
        route: "Mumbai CST → Lucknow",
        stations: ["Mumbai CST", "Kalyan", "Nashik", "Manmad", "Bhusaval", "Itarsi", "Kanpur", "Lucknow"],
        coaches: ["B1", "B2", "B3", "B4", "S1", "S2", "S3", "S4"]
    },
    "12223": {
        trainNumber: "12223",
        trainName: "Rajdhani Express",
        route: "Hazrat Nizamuddin → Lucknow",
        stations: ["Hazrat Nizamuddin", "Kanpur", "Lucknow"],
        coaches: ["A1", "A2", "B1", "B2", "B3", "H1"]
    },
    "12802": {
        trainNumber: "12802",
        trainName: "Purushottam Express",
        route: "New Delhi → Puri",
        stations: ["New Delhi", "Kanpur", "Allahabad", "Mughal Sarai", "Bhubaneswar", "Puri"],
        coaches: ["A1", "B1", "B2", "B3", "B4", "S1", "S2", "S3"]
    },
    "12560": {
        trainNumber: "12560",
        trainName: "Shivganga Express",
        route: "Varanasi → Mumbai CST",
        stations: ["Varanasi", "Allahabad", "Jabalpur", "Nagpur", "Bhusaval", "Nashik", "Mumbai CST"],
        coaches: ["B1", "B2", "B3", "B4", "S1", "S2", "S3"]
    },
    "12615": {
        trainNumber: "12615",
        trainName: "Grand Trunk Express",
        route: "New Delhi → Chennai Central",
        stations: ["New Delhi", "Agra", "Jhansi", "Bhopal", "Nagpur", "Vijayawada", "Chennai Central"],
        coaches: ["A1", "B1", "B2", "B3", "B4", "S1", "S2", "S3", "S4"]
    },
    "12876": {
        trainNumber: "12876",
        trainName: "Neelachal Express",
        route: "Haridwar → Puri",
        stations: ["Haridwar", "Roorkee", "Moradabad", "Bareilly", "Lucknow", "Kanpur", "Allahabad", "Mughal Sarai", "Bhubaneswar", "Puri"],
        coaches: ["A1", "B1", "B2", "B3", "S1", "S2", "S3"]
    }
};

/**
 * Get train information by train number
 */
export const getTrainByNumber = (trainNumber: string): TrainInfo | null => {
    return trainDatabase[trainNumber] || null;
};

/**
 * Extract train number from PNR and get corresponding train info
 * PNR format: First 4-5 digits often relate to train, but we'll use last 4 digits for mapping
 */
export const getTrainByPNR = (pnr: string): TrainInfo | null => {
    // Extract some digits from PNR to map to a train
    const pnrNum = parseInt(pnr.substring(0, 5));
    const trainNumbers = Object.keys(trainDatabase);

    // Use PNR to deterministically select a train
    const index = pnrNum % trainNumbers.length;
    const trainNumber = trainNumbers[index];

    return trainDatabase[trainNumber];
};

/**
 * Get a random coach from a train
 */
export const getRandomCoach = (trainInfo: TrainInfo): string => {
    const coaches = trainInfo.coaches;
    return coaches[Math.floor(Math.random() * coaches.length)];
};

/**
 * Get a random station from a train's route
 */
export const getRandomStation = (trainInfo: TrainInfo): string => {
    const stations = trainInfo.stations;
    return stations[Math.floor(Math.random() * stations.length)];
};

/**
 * Generate a random journey date (within last 30 days or next 7 days)
 */
export const generateJourneyDate = (): string => {
    const today = new Date();
    const daysOffset = Math.floor(Math.random() * 37) - 30; // -30 to +7 days
    const journeyDate = new Date(today);
    journeyDate.setDate(today.getDate() + daysOffset);
    return journeyDate.toISOString().split('T')[0]; // YYYY-MM-DD format
};

/**
 * Get complete journey details based on train number or PNR
 */
export const getJourneyDetails = (trainNumber?: string, pnr?: string) => {
    let trainInfo: TrainInfo | null = null;

    if (trainNumber) {
        trainInfo = getTrainByNumber(trainNumber);
    } else if (pnr) {
        trainInfo = getTrainByPNR(pnr);
    }

    if (!trainInfo) {
        return null;
    }

    return {
        trainNumber: trainInfo.trainNumber,
        trainName: trainInfo.trainName,
        coach: getRandomCoach(trainInfo),
        station: getRandomStation(trainInfo),
        journeyDate: generateJourneyDate()
    };
};
