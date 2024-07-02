-- Create extension if not exists
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create table for roads
CREATE TABLE roads (
    gid SERIAL PRIMARY KEY,
    source INT,
    target INT,
    length FLOAT
);

-- Add geometry column for storing road geometries (change SRID to match your data)
SELECT AddGeometryColumn('roads', 'geom', 4326, 'LINESTRING', 2);

-- Insert sample road data (modify as needed)
INSERT INTO roads (source, target, length, geom)
VALUES
    (1, 2, 5.0, ST_GeomFromText('LINESTRING(-74.006 40.712, -73.935 40.730)', 4326)),
    (2, 3, 3.0, ST_GeomFromText('LINESTRING(-73.935 40.730, -73.991 40.759)', 4326))    ;
