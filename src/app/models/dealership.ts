export class Dealership {
    name: string; 
    cnpj: string; 
    state: string;
    city: string;
    dealer: string;
    phone: string;
    vehicles: Vehicle;
}

export class Vehicle {
    plate: string;
    type: string;
    brand: string;
    name: string;
    year: string;
    fuel: string;
    price: number;
    image: string;
}